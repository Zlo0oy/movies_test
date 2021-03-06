import React, { Component } from "react";
import { Col, Row, Container } from "reactstrap";
import Pagination from "react-js-pagination";
import { connect } from "react-redux";
import { getMoviesInfo, changePageNumber } from "../../../actions/Actions";
import Poster from './poster/Poster';

import "./Posters.css";

class Posters extends Component {
  componentDidMount() {
    this.props.getMoviesInfo(this.props.page);
  }

  onPageClick = e => {
    const { getMoviesInfo, changePageNumber } = this.props;

    changePageNumber(e);
    getMoviesInfo(e);
  };

  render() {
    const { data } = this.props.info;

    return (
      <Container fluid className="main-page">
        <Row noGutters>
          <Col>
            <p className="main-text-p">Latest Releases</p>
          </Col>
        </Row>
        <div className="d-flex justify-content-between">
          <Container fluid>
            <Row className="justify-content-center poster-row">
              <Poster data={data}/>
            </Row>
          </Container>
        </div>
        <Container fluid>
          <Pagination
            activePage={data && this.props.page}
            itemsCountPerPage={1}
            totalItemsCount={data && data.total_pages}
            pageRangeDisplayed={3}
            onChange={this.onPageClick}
            firstPageText="First"
            lastPageText="Last"
            prevPageText="Prev"
            nextPageText="Next"
            innerClass="pagination"
            linkClass="pagination-pages"
            linkClassFirst="pagination-link-first"
            linkClassLast="pagination-link-last"
    activeLinkClass="pagination-link-active"
          />
        </Container>
      </Container>
    );
  }
}

const mapStoreToProps = store => {
  return {
    info: store.info,
    isFetching: store.isFetching,
    error: store.error,
    page: store.page
  };
};

const mapDispatchToProps = {
  getMoviesInfo,
  changePageNumber
}

export default connect(
  mapStoreToProps,
  mapDispatchToProps
)(Posters);
