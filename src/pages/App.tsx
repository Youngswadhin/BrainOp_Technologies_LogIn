/* eslint-disable @typescript-eslint/no-unused-vars */
import { useRecoilState } from "recoil";
import Posts from "./Posts";
import { authAtom } from "../atom/atom";

function App() {
  const [auth, setAuth] = useRecoilState(authAtom);
  return (
    <div className="w-screen text-white px-4 md:px-10 flex flex-col items-center justify-center">
      {auth ? (
        <Posts />
      ) : (
        <>
          <div className="mt-36 heading tracking-widest text-[clamp(50px,8vw,130px)] font-medium text-white/50 w-full text-center h-max flex items-center justify-center selection:text-blue-300">
            {`POSTS`.split("").map((e, i) => {
              return (
                <span
                  className="hover:translate-y-2 hover:text-white/40 duration-200"
                  key={i}
                >
                  {e}
                </span>
              );
            })}
          </div>
          <div className="desc text-sm sm:text-base md:text-lg tracking-widest flex items-center justify-center gap-1 text-white/40 selection:text-blue-100 flex-wrap">
            Just Test The <div className="text-5xl leading-none">∞</div> Scroll
            After Signin...
          </div>
        </>
      )}
    </div>
  );
}

export default App;
