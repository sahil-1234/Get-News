import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { categories } from '../constants/index';

function Navbar() {
  const close = useRef();
  const navigate = useNavigate();

  const [query, setQuery] = useState('');

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search?query=${query}`);
    close.current.click();
  };

  return (
    <>
      <nav className="navbar navbar-dark bg-success fixed-top">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            Get News
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasTopNavbar"
            aria-controls="offcanvasTopNavbar"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="offcanvas offcanvas-start text-dark"
            tabIndex="-1"
            id="offcanvasTopNavbar"
            aria-labelledby="offcanvasTopNavbarLabel"
          >
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="offcanvasTopNavbarLabel">
                Get News
              </h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
                ref={close}
              ></button>
            </div>
            <div className="offcanvas-body">
              <ul className="navbar-nav flex-column pe-3">
                <li className="nav-item mb-3">
                  <a className="nav-link active" aria-current="page" href="/">
                    Home
                  </a>
                </li>
                <li className="nav-item dropdown mb-3">
                  <a
                    className="nav-link dropdown-toggle"
                    href="/"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Categories
                  </a>
                  <ul className="dropdown-menu dropdown-menu-dark">
                    {categories.map((e) => {
                      if (e === 'RealEstate') {
                        return (
                          <li key={e}>
                            <a
                              className="dropdown-item"
                              href={`/categories/${e.toLowerCase()}`}
                            >
                              Real Estate
                            </a>
                          </li>
                        );
                      } else if (e === 'Sundayreview') {
                        return (
                          <li key={e}>
                            <a
                              className="dropdown-item"
                              href={`/categories/${e.toLowerCase()}`}
                            >
                              Sunday Opinion
                            </a>
                          </li>
                        );
                      }
                      return (
                        <li key={e}>
                          <a
                            className="dropdown-item"
                            href={`/categories/${e.toLowerCase()}`}
                          >
                            {e}
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </li>
              </ul>
              <form className="d-flex mt-3" role="search" onSubmit={handleSubmit}>
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  name="search"
                  onChange={handleChange}
                />
                <button className="btn btn-success" type="submit">
                  Search
                </button>
              </form>
            </div>
          </div>
        </div>
      </nav>

      {/* Custom CSS to make offcanvas sidebar transparent */}
      <style jsx>{`
        .offcanvas-start {
          background-color: transparent;
          box-shadow: none;
        }
      `}</style>
    </>
  );
}

export default Navbar;
