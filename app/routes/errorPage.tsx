import { Link, useNavigate } from "react-router";

export function meta() {
  return [{ title: "Page not found" }];
}

export default function ErrorPage() {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center">
      <div className="max-w-md text-center">
        <h1 className="text-7xl md:text-8xl lg:text-9xl font-extrabold text-primary-color">404</h1>
        <p className="mt-4 text-2xl font-semibold">Oops! Page Not Found</p>
        <p className="mt-2 text">
          The page you&apos;re looking for doesn&apos;t exist or was moved.
        </p>
        <div className="mt-6 flex justify-center gap-4">
          <button className="btn-primary" onClick={() => navigate(-1)}>
            Go Back
          </button>
          <Link to="/" className="btn-primary">
            Home
          </Link>
        </div>
      </div>
    </div>
  );
}
