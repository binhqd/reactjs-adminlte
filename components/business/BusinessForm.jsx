import React from 'react';
import {PropTypes} from 'prop-types';
import Promise from 'bluebird';
import {connect} from 'react-redux';
import {Categories, Businesses} from 'api';
import {CategoryParentList} from 'components/category';
import CONFIG from 'base/constants/config';
import BizGallery from './BizGallery.jsx';
import { withRouter } from 'react-router-dom';

let styles = require('./styles.scss');

class BusinessForm extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      name: '',
      description: '',
      address: '',
      geo_lng: '',
      geo_lat: '',
      logo: null,
      images: [],
      phone: '',
      fax: '',
      website: '',
      category_id: ''
    }
  }

  onInputChange(name, e) {
    let value = e.target ? e.target.value : e;
    this.setState({
      [name]: value
    })
  }

  submitForm(e) {
    let params = {};

    let data = {
      ...this.state
    }

    if (typeof this.props.businessId != "undefined") {
      params = {id: this.props.businessId};
    }

    return this.props.dispatch(this.props.fnSubmit(params, {
      data
    }))
      .then(response => {
        // reload list
        this.props.dispatch(Businesses.actions.list());

        if (typeof this.props.cb == 'function') {
          this.props.cb(response);
        }

        return Promise.resolve(response)
      })
      .catch(err => {
        Promise.reject(err);
      })
  }

  componentDidMount() {
    // get business info
    if (this.props.businessId) {
      Businesses.actions.get.request({id: this.props.businessId}).then(res => {
        this.setState({
          ...res.data
        });
      });
    }

  }

  handleFileUpload(e) {
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      // file load end
      let data = new FormData();
      data.append('fileUpload', file);

      this.props.dispatch(
        Businesses.actions.uploadLogo({}, {
          data: data
        })
      ).then(response => {
        this.setState({
          logo: response.data.name
        })
      }).catch(err => {
        console.log(err);
      });
    };
    reader.readAsDataURL(file);
  }

  selectCategory(id) {
    this.setState({
      category_id: id
    });
  }

  onAddressChange(e) {
    let value = e.target ? e.target.value : e;
    this.onInputChange('address', e);




  }

  removeLogo() {
    this.setState({
      logo: ''
    })
  }

  onGalleryChange(images, e) {
    this.setState({
      images
    })
  }

  render() {

    return (
      <div>
        <div className="form-group">
          <label>Name</label>
          <input type="text" className="form-control" value={this.state.name} placeholder="Name" onChange={this.onInputChange.bind(this, 'name')}/>
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea className="form-control" placeholder="Description" onChange={this.onInputChange.bind(this, 'description')}
            value={this.state.description}
            />
        </div>
        <div className="form-group">
          <label>Address</label>
          <input type="text" className="form-control" value={this.state.address} placeholder="Address" onChange={this.onAddressChange.bind(this)}/>
        </div>

        <div className="form-group">
          <label>Latitude</label>
          <input type="text" disabled className="form-control" value={this.state.geo_lat} placeholder="Latitude" onChange={this.onInputChange.bind(this, 'geo_lat')}/>
        </div>
        <div className="form-group">
          <label>Longitude</label>
          <input type="text" disabled className="form-control" value={this.state.geo_lng} placeholder="Longitude" onChange={this.onInputChange.bind(this, 'geo_lng')}/>
        </div>
        <div className="form-group">
          <label>Phone</label>
          <input type="text" className="form-control" value={this.state.phone} placeholder="Phone" onChange={this.onInputChange.bind(this, 'phone')}/>
        </div>
        <div className="form-group">
          <label>Fax</label>
          <input type="text" className="form-control" value={this.state.fax} placeholder="Fax" onChange={this.onInputChange.bind(this, 'fax')}/>
        </div>
        <div className="form-group">
          <label>Website</label>
          <input type="text" className="form-control" value={this.state.website} placeholder="http://" onChange={this.onInputChange.bind(this, 'website')}/>
        </div>

        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Select category:</label>
          <CategoryParentList showAll={true} parentCategory={this.state.category_id} onChange={this.selectCategory.bind(this)}/>
        </div>

        <div className="form-group">
          {
            (() => {
              let img = require('assets/images/placeholder-128.jpg');

              if (this.state.logo) {
                img = `${CONFIG.staticURL}/biz-logos/${this.state.logo}`;
              }

              return (
                <div>
                  <img className="media-object" src={img} alt="..." width="128" height="128"/> [ <a href='javascript:void(0)' onClick={this.removeLogo.bind(this)}>Remove</a> ]
                </div>
              )
            })()
          }
          <label>Upload business logo</label>
          <input type="file" className="form-control-file" aria-describedby="fileHelp" onChange={this.handleFileUpload.bind(this)}/>
        </div>

        <BizGallery label="Business Image" images={this.state.images} uploadFunc={Businesses.actions.uploadImage.request} onChange={this.onGalleryChange.bind(this)}/>

        <button type="submit" className="btn btn-primary" onClick={this.submitForm.bind(this)}>{
            typeof this.props.businessId == "undefined" ?
            'Add new business'
            : 'Update business'
          }</button>

        <button type='button' className="btn" onClick={() => this.props.history.push('/businesses')}>Cancel</button>
      </div>
    )
  }
}

const mapStateToProps = function(state) {
  return {
    categoriesAsTree: state.categoriesAsTree
  }
}

BusinessForm.propTypes = {
  fnSubmit: PropTypes.func.isRequired
}

export default withRouter(connect(mapStateToProps)(BusinessForm));
