import pi from "./../assets/Pi.png"

function Header() {
  return (
    <header className="app-header">
      <img
        src={pi}
        alt="React logo"
      />
      <h1 className="colorized-text">Mathematic's Quiz</h1>
    </header>
  );
}

export default Header;
