import React, { Component } from 'react'
import Axios from 'axios'
const artAxios = Axios.create()
const { Consumer, Provider } = React.createContext()

artAxios.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  config.headers.Authorization = `Bearer ${token}`
  return config
})

class GlobalProvider extends Component {
  constructor(){
    super()
    this.state = {
      search: "",
      artIds: [],
      searchedArt: [],
      userData: {},
      user: JSON.parse(localStorage.getItem('user')) || {},
      token: localStorage.getItem('token') || '',
      authErrMsg: "",
      username: "",
      password: "",
      likedArt:[],
      likedArtID:[]
    }
  }

  handleChange = e => {
    const { name, value } = e.target
        this.setState({[name]: value})
  }

  handleSubmit = e => {
    e.preventDefault()
    const { search, artIds , artIds: {length}  } = this.state
    Axios.get(`https://collectionapi.metmuseum.org/public/collection/v1/search?q=${search}`)
    .then( res => {
      const { objectIDs } = res.data
      this.setState({artIds: objectIDs})
      if(artIds === null && search !== "") {
        alert('no search results')
      } else if (artIds === null && search === ""){
        alert('type something in the search bar')
      } else if (length > 100){
        artIds.splice(100, length)
      }
    })
    .then( () => {
      const { artIds , artIds: {length}  } = this.state
      length > 0 && artIds.map( (id, i) => {
        if(i < 21){
          Axios.get(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`).then( res => {
            const { culture, department, medium, period, primaryImage, title, creditLine, objectID } = res.data
            const artObj = {
              title,
              primaryImage,
              culture,
              department,
              medium,
              period,
              creditLine,
              objectID
            }
            this.setState( prevState => ({ searchedArt: [...prevState.searchedArt, artObj] }))
          })
        }
      }) 
    })
    this.setState({searchedArt: []})
  }

  getUserData = () => {
    artAxios.get('/api/art').then( response => {
      this.setState({likedArt: response.data})
    })
  }

  userSignUp = (userInfo) => {
    return Axios.post("/auth/signup", userInfo)
    .then(res => {
      const { user, token } = res.data
      localStorage.setItem("token", token)
      localStorage.setItem("user", JSON.stringify(user))
      this.setState({
        user,
        token,
        authErrMsg: ""
      })
      alert(`${this.state.username} successfully signed up`)
      return res
    })
  }

  userLogin = (userInfo) => {
    return Axios.post("/auth/login", userInfo)
    .then(res => {
      const { user, token } = res.data
      localStorage.setItem("token", token)
      localStorage.setItem("user", JSON.stringify(user))
      this.setState({
        user,
        token,
        authErrMsg: ""
      })
      alert(`${this.state.username} successfully logged in`)
      return res
    })
  }

  componentDidMount(){
    artAxios.get("/api/art/").then(res => {
      const artPieces = res.data.map( artPiece => artPiece.objectID)
      this.setState({likedArt: res.data, likedArtID: artPieces})
    })
  }

  favoritedArt = (favoritedArt) => {
    const { likedArtID } = this.state
    const { objectID, title, primaryImage, culture, department, medium, period, creditLine } = favoritedArt
    this.setState(prevState => {return {
      likedArtID: [...prevState.likedArtID, objectID],
      likedArt: [...prevState.likedArt, favoritedArt]
    }})
    likedArtID.includes(objectID) === true ?
    alert('this is already liked') :
    artAxios.post("/api/art/", { 
      title,
      primaryImage,
      culture,
      department,
      medium,
      period,
      creditLine,
      objectID 
    })
    this.getUserData()
  }

  unFavoriteArt = piece => {
    const { objectID, _id } = piece
    const { likedArt , likedArtID } = this.state
    const unFav = _id
    const newLikedArray = likedArt.filter(id => {return id.objectID !== objectID})
    const newLikedIdArray = likedArtID.filter(id => {return id !== objectID})
    
    artAxios.delete(`/api/art/${unFav}`).then( res => {
      this.setState({
        likedArt: newLikedArray,
        likedArtID: newLikedIdArray
      })
    }, res => {
      alert('there was a problem deleting')
    })
  }

  logout = e => {
    const { username } = this.state
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    this.setState({ user: {}, token: "", authErrMsg: "" })
    alert(`${ username } successfully logged out`)
  }

  render() {
    return (
      <Provider value={{
        ...this.state,
        getUserData: this.getUserData,
        userSignUp: this.userSignUp,
        userLogin: this.userLogin,
        logout: this.logout,
        handleChange: this.handleChange,
        handleSubmit: this.handleSubmit,
        favoritedArt: this.favoritedArt,
        unFavoriteArt: this.unFavoriteArt,
        likedArtID: this.state.likedArtID,
        likedArt: this.state.likedArt,
        searchedArt: this.state.searchedArt,
        username: this.state.username
      }} >{this.props.children}
      </Provider>
    )
  }
}

export default GlobalProvider

export const withGlobalProvider = C => props => (
  <Consumer>
  { value => < C {...props} {...value} /> }
  </Consumer>
)