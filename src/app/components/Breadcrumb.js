import Link from "next/link";

export default function Breadcrumb({ pageTitle, parentPage }) {
  return (
    <section className="breadcrumb-section set-bg" style={{ backgroundImage: "url('/img/breadcrumb.jpg')" }}>
      <div className="container">
        <div className="row">
          <div className="col-lg-12 text-center">
            <div className="breadcrumb__text">
              <h2>{pageTitle}</h2>
              <div className="breadcrumb__option">
                {parentPage && <Link href={parentPage.href}>{parentPage.title}</Link>}
                <span>{pageTitle}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
