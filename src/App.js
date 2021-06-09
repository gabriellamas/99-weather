const getLocation = () =>{
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
      console.log(responseError);
    },
  );
}


const App = () =>(
    <div className="App">
      <h1>Previsão do tempo</h1>
      <input type="text" placeholder="Insira o nome da cidade"/>
      <p>ou</p>

      <label>Pegar pela minha localização</label><br/>
      <button type="button" onClick={()=>getLocation()}>Liberar minha localização</button>
    </div>
  );

export default App;
