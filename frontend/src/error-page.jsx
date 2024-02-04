import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, the following unexpected error has occurred:</p>
      <h4>
        <i>{error.statusText || error.message}</i>
      </h4>
    </div>
  );
}