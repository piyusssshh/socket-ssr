import { useLayoutEffect } from "react";
import Image from "next/image";
import TrustedBy from "@/components/trustedBy/trustedBy";
import { getDbdashData } from "./api";
import Link from "next/link";

export async function getServerSideProps() {
  const IDs = ["tblsaw4zp", "tblwql8n1"];

  const dataPromises = IDs.map((id) => getDbdashData(id));
  const results = await Promise.all(dataPromises);

  return {
    props: {
      trustedBy: results[0].data.rows,
      testimonials: results[1].data.rows,
    },
  };
}

const Login = ({ testimonials, trustedBy }) => {
  useLayoutEffect(() => {
    const configuration = {
      referenceId: process.env.NEXT_PUBLIC_REFERENCE_ID,
      success: (data) => {
        console.log("success response", data);
      },
      failure: (error) => {
        console.log("failure reason", error);
      },
    };
    if (typeof window.initVerification === "function") {
      window.initVerification(configuration);
    } else {
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = "https://proxy.msg91.com/assets/proxy-auth/proxy-auth.js";

      const handleLoad = () => {
        if (typeof window.initVerification === "function") {
          window.initVerification(configuration);
        } else {
          console.error("initVerification function not found");
        }
      };

      script.addEventListener("load", handleLoad);

      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
        script.removeEventListener("load", handleLoad);
      };
    }
  }, []);

  return (
    <>
      <div className="flex w-screen md:h-screen flex-col-reverse md:flex-row">
        <div className="md:py-12 md:pl-12 py-6 pl-6 md:pr-0 pr-6 flex flex-col md:w-3/5 w-full overflow-x-hidden overflow-y-scroll gap-6 bg-[#EDE8DE] ">
          <Image
            className="hidden md:block"
            src="/assets/brand/logo.svg"
            width={158.6}
            height={40}
            alt="viasocket"
          />
          <h2 className=" text-2xl">
            Upgrade yout team with powerful automation tool
          </h2>
          <div>
            <p className="text-xl font-bold">
              We’ll help you get started, with our
            </p>
            <p className="text-xl ">24x7 Chat Support</p>
          </div>

          <TrustedBy data={trustedBy} />

          <div className="flex md:flex-row flex-col gap-4 w-full mt-8">
            {testimonials &&
              testimonials.map((testimonial, index) => {
                return (
                  <div
                    className="flex flex-col rounded-md md:min-w-[380px] min-w-full p-4 md:p-8 gap-8 bg-[#F6F4EE] "
                    key={index}
                  >
                    <p className="font-inter text-lg font-normal leading-[32px] tracking-normal text-left ">
                      " {testimonial?.testimonial}"
                    </p>
                    <div className="flex items-center gap-2 mt-auto">
                      <Image
                        className="rounded-full"
                        src={testimonial?.client_img[0]}
                        width={36}
                        height={36}
                      />
                      <div>
                        <p className="font-inter font-semibold leading-4 tracking-normal text-left">
                          {testimonial?.given_by}
                        </p>
                        <p className="font-inter text-sm font-normal leading-4 tracking-normal text-left pt-1 text-gray-400">
                          {testimonial?.giver_title}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

        <div className="md:w-2/5 w-full bg-white p-6 md:p-12 flex flex-col gap-6  py-12">
          <Image
            className="md:hidden block"
            src="/assets/brand/logo.svg"
            width={158.6}
            height={40}
            alt="viasocket"
          />
          <h2 className="text-2xl font-bold">Create an account</h2>
          <p className="text-sm ">Sign up with</p>
          <div id={process.env.NEXT_PUBLIC_REFERENCE_ID} />
          <div className="flex ">
            <span className="text-sm">If you already have an account,</span>
            <Link href="/login" className="ms-1 text-sm text-sky-700">
              Login
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
export default Login;
