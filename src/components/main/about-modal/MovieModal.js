import React, { Component } from "react";
import { Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import { inject, observer } from 'mobx-react';

import "./MovieModal.css";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { faArrowAltCircleRight } from "@fortawesome/free-solid-svg-icons";
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

library.add(faArrowAltCircleLeft);
library.add(faArrowAltCircleRight);
library.add(faPlusCircle)
library.add(faTimesCircle)

@inject('modalStore')
@observer
class MovieModal extends Component {
  state = {
    toggleRerender: true,
  };

  componentDidMount() {
    const pathname = this.props.location.pathname;
    this.props.modalStore.getMovieDetails(pathname);
    if (!localStorage.getItem("main-arr")) {
      localStorage.setItem("main-arr", JSON.stringify([]));
    } else return false;
  }

  componentWillUnmount() {
    this.props.modalStore.clearMovieDetails();
  }

  render() {
    if (!this.props.modalStore.details.data) {
      return <div>...Loading</div>;
    }

    const {
      poster_path,
      title,
      release_date,
      vote_average,
      adult,
      overview,
      id
    } = this.props.modalStore.details.data;
    const posterPath = `http://image.tmdb.org/t/p/w342${poster_path}`;
    const releaseDate = release_date && release_date.slice(0, 4);

    const fullReleaseDate = () => {
      const dateReleaseDate = new Date(release_date).toDateString();
      return `${dateReleaseDate.slice(4)}`;
    };

    const toggleRerender = () => {
      this.setState({ toggleRerender: !this.state.toggleRerender });
    };

    //Favoutite button onCLick function
    const addToLocalStorage = e => {
      const { data } = this.props.modalStore.details;

      let oldArr = JSON.parse(localStorage.getItem("main-arr"));
      const boolArr = oldArr.map(obj => (obj.id !== data.id ? true : false));

      if (!boolArr.includes(false)) {
        oldArr = oldArr.concat(data);
        localStorage.setItem("main-arr", JSON.stringify(oldArr));
      } else {
        oldArr = oldArr.filter(el => el.id !== e);
        localStorage.setItem("main-arr", JSON.stringify(oldArr));
      }
      toggleRerender();
    };

    const checkFavBtnValue = (adapt) => {
      const { data } = this.props.modalStore.details
      const localStorageArr = JSON.parse(localStorage.getItem("main-arr"));
      const boolArr = localStorageArr.map(obj =>
        obj.id !== data.id ? true : false
      );

      if (boolArr.includes(false)) {
        if(adapt) {
          return "Remove";
        } else {
          return <FontAwesomeIcon icon = "times-circle" />
        }
      } else {
          if(!adapt) {
            return <FontAwesomeIcon icon = "plus-circle" />
          } else {
            return "Add";
          }
        }
      }

    return (
      <div className="movie-modal">
        <div
          className="background-img"
          style={{ backgroundImage: `url(${posterPath})` }}
        />{" "}
        <Row noGutters>
          <Col className="d-flex justify-content-start">
            <Link to={"/"}>
              <p className="button-left">
                <FontAwesomeIcon
                  icon="arrow-alt-circle-left"
                  className="arrow-left"
                />
                <span>Back to list</span>
              </p>
            </Link>
          </Col>

          <Col className="d-flex justify-content-end">
            <p className="button-right">
              <span>Next Movie </span>
              <FontAwesomeIcon
                icon="arrow-alt-circle-right"
                className="arrow-right"
              />
            </p>
          </Col>
        </Row>
        <Row noGutters className="modal-row">
          {/* Modal Poster */}
          <Col md="4" xs="6" className="d-flex justify-content-center info-col">
            <img
              src={posterPath}
              alt="poster"
              className="img-fluid poster-modal"
            />
          </Col>
          {/* Main favorite button */}
          <Col md="8" xs="6" className="movie-info-col">
            <p className="d-flex justify-content-end favorite-but-default">
              <span onClick={() => addToLocalStorage(id)}>
                {checkFavBtnValue(true)}
              </span>
            </p>

            <p className="info-title">
              {title} ({releaseDate})
            </p>

            <p className="info-s-r-rd justify-content-start">
                  <span className="info-s white-space">
                    Score: 
                    <span onClick={() => addToLocalStorage(id)} className = 'favorite-but-576'>
                      {checkFavBtnValue()}
                    </span> <br className="s-r-rd-br-class" />
                    <span className="info-s-r-rd-values-576">
                      {vote_average}
                    </span>
                  </span>
              <br className="info-br-class" />
              <span className="info-r white-space">
                Rating: <br className="s-r-rd-br-class" />
                <span className="info-s-r-rd-values-576">
                  {adult ? "R" : "PG"}
                </span>
              </span>
              <br className="info-br-class" />
              <span className="info-rd white-space">
                Release Date: <br className="s-r-rd-br-class" />
                <span className="white-space info-s-r-rd-values-576">
                  {fullReleaseDate()}
                </span>
              </span>
            </p>
            <p className="info-about">{overview}</p>
          </Col>
          <Col xs="12">
            <p className="info-title-576">
              {title} ({releaseDate})
            </p>
            <p className="info-about-576">{overview}</p>
          </Col>
        </Row>
      </div>
    );
  }
}

export default MovieModal;
