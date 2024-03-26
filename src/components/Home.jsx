import { useEffect, useState } from "react";

const Home = () => {

  const nameLocations = ["Roma", "Sahara", "Antartica", "Singapore", "Hawai"]

  const [photoLocations, setPhotoLocations] = useState(null)

  const getPhotoLocations = async () => {
    try {
      const requests = nameLocations.map(location =>
        fetch("https://api.pexels.com/v1/search?query=" + location + "&per_page=1", {
          headers: {
            "Authorization": "ifbuQCuGTrbmEOof10n9yXGfVaWjUFcpLwodmFpq5GtLg0BZxQJcDjHy"
          }
        }).then(response => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
      );

      const photoData = await Promise.all(requests);
      setPhotoLocations(photoData);
      console.log("Dati delle foto ottenuti:", photoData);
    } catch (error) {
      console.error("Si è verificato un errore:", error);
      alert("Si è verificato un errore durante il recupero delle foto.");
    }
  };



  useEffect(() => {
    getPhotoLocations()
  }, [])




  return (

    <div className="imgHome row mx-0 px-3 justify-content-center">

      <div className="col-12 col-lg-6 col-xxl-4">
        <h1 className="headings pt-5">Il tempo, in tempo reale!</h1>
        <div className="roller">
          <div id="rolltext" className="headings fs-3">
            <div id="drop-down">quando vuoi</div>
            <div>dove vuoi</div>
            <div>in tempo reale</div>
            <div>qualsiasi zona</div>
          </div>
        </div>

      </div>


      <div className="mt-4 col-12 col-md-9 col-lg-6 col-xxl-8">
        {photoLocations &&
          <div id="carouselExampleCaptions" className="carousel slide carousel-settings rounded-4" data-bs-ride="true">
            <div className="carousel-indicators">
              <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
              <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
              <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
              <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="3" aria-label="Slide 4"></button>
              <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="4" aria-label="Slide 5"></button>
            </div>
            <div className="carousel-inner rounded-4 ">
              <div className="carousel-item active">

                <div className="">
                  <img className="img-carousel rounded-4" src={photoLocations[0].photos[0].src.large} alt="..." />
                </div>

                <span className="carousel-caption d-none d-sm-block bg-black bg-opacity-50 py-0 mb-4 rounded-5 fw-bold ">
                  {photoLocations[0].photos[0].alt}
                </span>

              </div>
              <div className="carousel-item">

                <div className="">
                  <img className="img-carousel rounded-4" src={photoLocations[1].photos[0].src.large} alt="..." />
                </div>

                <span className="carousel-caption d-none d-sm-block bg-black bg-opacity-50 py-0 mb-4 rounded-5 fw-bold ">
                  {photoLocations[1].photos[0].alt}
                </span>

              </div>
              <div className="carousel-item">

                <div className="">
                  <img className="img-carousel rounded-4" src={photoLocations[2].photos[0].src.large} alt="..." />
                </div>

                <span className="carousel-caption d-none d-sm-block bg-black bg-opacity-50 py-0 mb-4 rounded-5 fw-bold ">
                  {photoLocations[2].photos[0].alt}
                </span>

              </div>
              <div className="carousel-item">

                <div className="">
                  <img className="img-carousel  rounded-4" src={photoLocations[3].photos[0].src.large} alt="..." />
                </div>

                <span className="carousel-caption d-none d-sm-block bg-black bg-opacity-50 py-0 mb-4 rounded-5 fw-bold ">
                  {photoLocations[3].photos[0].alt}
                </span>

              </div>
              <div className="carousel-item">

                <div className="">
                  <img className="img-carousel  rounded-4" src={photoLocations[4].photos[0].src.large} alt="..." />
                </div>

                <span className="carousel-caption d-none d-sm-block bg-black bg-opacity-50 py-0 mb-4 rounded-5 fw-bold ">
                  {photoLocations[4].photos[0].alt}
                </span>

              </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>}
      </div>


    </div>
  );
};
export default Home;
