export const getImage = (e,allGenre,playlist2) => {

    let image
    if (e.catagory === "playlist") {
      playlist2.forEach((item) => {
        if (item.name === e.name) {
          image = item.songs[0].image
        }
      })
    } else {
      allGenre.some(category => {
        return category.playlists.some(playlist => {
          if (playlist.name === e.name) {
            image = playlist.image
            return (true);
          }
          return false;
        });
      });
    }

    return image
  }