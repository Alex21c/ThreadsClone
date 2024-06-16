import { useRouteError } from "react-router-dom";

export default function NotFound(){
  let error = useRouteError();     
  return (
  <>
    <span className="text-red-300">Error: {error.status}, {error.statusText} !</span>
  </>);
}