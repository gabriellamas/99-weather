const getCoords = () =>{
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const long = position.coords.longitude;
        window.localStorage.setItem(
          'coords',
          JSON.stringify({ lat, long }),
        );
        console.log({ lat, long });
      },
      (responseError) => {
        // eslint-disable-next-line
        console.log(responseError.message);
      },
    );
  }
  
  export default getCoords