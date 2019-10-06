import React from 'react';
import { withGlobalProvider } from './GlobalProvider'

const Art = (props) => {
  const { handleChange, handleSubmit, favoritedArt, likedArtID, searchedArt } = props
  return(
      <div className="main-container art-background">
        <div className="art-container">
          <div className="search-form">
            <h3 className="search-bar">Art search</h3> 
            <form onSubmit={handleSubmit}>
              <input type="text" onChange={handleChange} name="search" placeholder="Search" />
              <div className="submit"><button>Submit</button></div> 
            </form>
          </div>
          <div className="result-container">
            {searchedArt.map( art => {
              const { title , culture , department , medium , period , creditLine , primaryImage, objectID } = art
              return <div className="photo-container">
                { title && <h1 className="display"><span className="span">Title:</span> {title}</h1>}
                { culture && <h1 className="display"><span className="span">Culture:</span> {culture}</h1>}
                { department && <h1 className="display"><span className="span">Department:</span> {department}</h1>}
                { medium && <h1 className="display"><span className="span">Medium:</span> {medium}</h1>}
                { period && <h1 className="display"><span className="span">Period:</span> {period}</h1>}
                { creditLine && <h1 className="display"><span className="span">Credit line:</span> {creditLine}</h1>}
                <img className="display-image" src={primaryImage} alt=""/><br/>
                <div className="button-container">
                  <button className={likedArtID.includes(objectID) ? "liked-button-two" : "liked-button"} 
                    onClick={() => favoritedArt(art)}>
                    {likedArtID.includes(objectID) ? "liked" : "like"}
                  </button>
                </div>
              </div>
            })}
          </div>
        </div>
      </div>

  )
}

export default withGlobalProvider(Art)