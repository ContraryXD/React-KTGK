"use client";
import CategoriesDropdown from "./CategoriesDropdown";

export default function SimpleHero({ title = "Organi", showCategories = true }) {
  return (
    <section className="hero hero-normal">
      <div className="container">
        <div className="row">
          {showCategories && (
            <div className="col-lg-3">
              <CategoriesDropdown isOpen={false} showOnHomepage={false} />
            </div>
          )}
          <div className={showCategories ? "col-lg-9" : "col-lg-12"}>
            <div className="hero__search">
              <div className="hero__search__phone">
                <div className="hero__search__phone__icon">
                  <i className="fa fa-phone" />
                </div>
                <div className="hero__search__phone__text">
                  <h5>+84 11.188.888</h5>
                  <span>hỗ trợ 24/7</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
