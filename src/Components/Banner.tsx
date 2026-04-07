import './Banner.css';

function Banner() {
  return (
    <div className="link-group">
        <div className='glow-bottom'></div>
        <div className='link-subgroup'>
            <a href="index.html">
                <p>Home</p>
            </a>
            <a href="volunteer.html">
                <p>Postings</p>
            </a>
        </div>
        <a id="main-logo" href="index.html">
            <img src="src/assets/tuckerlogo.svg" alt="Nexus Logo" id="logo"></img>
            <div id="logo-text">
                <p>Tucker</p>
                <p id="sub-text">Lost & Found</p>
            </div>

        </a>
        <div className='link-subgroup'>
            <a href="calculator.html">
                <p>How-To</p>
            </a>
            <a href="about-us.html">
                <p>About Us</p>
            </a>
        </div>
    </div>
  );
}

export default Banner;
