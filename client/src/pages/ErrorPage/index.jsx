import { Link, useLocation } from "react-router-dom";

function ErrorPage() {
  const location = useLocation();

  return (
    <>
      <h2>Error</h2>
      <div>{location.state.errorMessage}</div>
      <Link to="/">메인 화면으로</Link>
    </>
  );
}

export default ErrorPage;
