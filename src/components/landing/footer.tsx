import Link from "next/link";

export const Footer = () => {
  return (
    <footer id="footer">
      <hr className="w-full mx-auto" />

      <section className="container py-10 grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-x-12 gap-y-8">
        <div className="col-span-full xl:col-span-2">
          <a href="/" className="font-bold text-xl flex">
            Snapcheck
          </a>

          <div className="flex flex-col gap-2">
            <div>
              <a href="#" className="opacity-60 hover:opacity-100">
                Home
              </a>
            </div>

            <div>
              <a href="#about" className="opacity-60 hover:opacity-100">
                About
              </a>
            </div>

            <div>
              <a href="#" className="opacity-60 hover:opacity-100">
                Services
              </a>
            </div>

            <div>
              <a href="#" className="opacity-60 hover:opacity-100">
                Blogs
              </a>
            </div>

            <div>
              <a href="#" className="opacity-60 hover:opacity-100">
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </section>
      <hr className="w-full mx-auto" />

      <section className="container py-5 text-center">
        <h3>
          &copy;
          <span className="text-primary  hover:underline">
            <Link href="/"> Snapcheck</Link>
          </span>{" "}
          2024{" "}
        </h3>
      </section>
    </footer>
  );
};
