import { Link } from "react-router-dom";

export const Print = (props) => {
  return (
    <div
      className={`fixed border border-slate-200 rounded flex justify-center p-2 drop-shadow-2xl bg-white w-72 transition-all duration-300 ease-in-out ${
        props.display === "absolute" ? "opacity-100 visible" : "opacity-0 invisible"
      } z-20 top-96 left-12 lg:top-[40%] lg:left-[45%] py-4`}
    >
      <div className="text-center space-y-2">
        <h1 className="text-4xl flex justify-center">{props.icon}</h1>
        <h1>{props.pesan}</h1>
        <div className="space-x-2">
          {props.pathA ? (
            <Link
              onClick={props.pathA}
              className="p-2 border border-slate-200 rounded"
            >
              {props.buttonA}
            </Link>
          ) : null}
          <Link
            onClick={props.pathB}
            className="p-2 border border-slate-200 rounded"
          >
            {props.buttonB}
          </Link>
        </div>
      </div>
    </div>
  );
};
