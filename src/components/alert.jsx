import { Link } from "react-router-dom";

export const Alert = (props) => {
  return (
    <>
      <div
        className={`border border-slate-200 rounded flex justify-center p-2 drop-shadow-2xl bg-white w-72 ${props.display} z-20 top-[40%] left-[45%] py-4`}
      >
        <div className="text-center space-y-2">
          <h1 className="text-4xl flex justify-center">{props.icon}</h1>
          <h1>{props.pesan}</h1>
          <div className="space-x-2">
            {props.pathA ? (
              <Link
                to={props.pathA}
                className="p-2 border border-slate-200 rounded"
              >
                {props.buttonA}
              </Link>
            ) : null}
            <Link
              to={props.pathB}
              onClick={
                typeof props.pathB === "function" ? props.pathB : undefined
              }
              className="p-2 border border-slate-200 rounded"
            >
              {props.buttonB}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
