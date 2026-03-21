export default function GetInvolvedPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold text-[#0f2d3d] mb-6">Get Involved</h1>
      <div className="space-y-8">
        <section>
          <h2 className="text-xl font-semibold text-[#0f2d3d] mb-3">
            Partner with Us
          </h2>
          <p className="text-gray-700">
            For corporations seeking to lead in sustainable change, collaborate,
            and support communities through furniture reuse. Contact us to learn
            about partnership opportunities.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-[#0f2d3d] mb-3">
            Become a Member
          </h2>
          <p className="text-gray-700">
            If you are a furniture bank and want to be added to this directory,
            you are welcome to apply for membership in the Furniture Bank Network.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-[#0f2d3d] mb-3">
            Contact
          </h2>
          <p className="text-gray-700">
            For inquiries about the Furniture Bank Network, please visit{" "}
            <a
              href="https://www.furniturebank.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#c42032] hover:underline"
            >
              furniturebank.org
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
