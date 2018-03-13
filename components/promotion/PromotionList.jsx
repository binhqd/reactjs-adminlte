import React from 'react';
// import Promotions from 'dummy/categories';
import {PromotionBox} from 'components/promotion';
import {connect} from 'react-redux';
import {Promotions} from 'base/api';
import {toastr} from 'react-redux-toastr';

class PromotionList extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      listPromotions: [],
      items: {}
    }
  }

  loadPromotions() {
    Promotions.actions.list.request().then(response => {
      let itemKeys = {};
      response.data.map(item => {
        itemKeys[item.id] = item;
      });

      this.setState({
        listPromotions: response.data,
        items: itemKeys
      })
    });
  }

  componentDidMount() {
    this.loadPromotions();
  }

  afterDelete() {
    toastr.removeByType("success");
    toastr.success("", "Xóa thành công")
    this.loadPromotions();
  }

  updateField(item, fieldName, e) {
    Promotions.actions.update.request({id: item.id}, {
      data: {
        [fieldName]: !item[fieldName]
      }
    }).then(response => {
      Promotions.actions.approve.request({id: item.id}).then(end => {
        toastr.removeByType('success');
        toastr.success("Thành công", "Trạng thái của tin khuyến mãi đã được cập nhật thành công");

        this.setState({
          items: {
            ...this.state.items,
            [this.state.items[item.id].id]: {
              ...this.state.items[item.id],
              [fieldName]: !this.state.items[item.id][fieldName]
            }
          }
        });
      });
    })
  }

  render() {
    return (
      <div className='container-fluid'>
        {
          this.state.listPromotions.map(promotion => {
            return (
              <div className='col-lg-5'>
                <PromotionBox key={promotion.id} data={promotion}
                  deleteCallBack={this.afterDelete.bind(this)}/>

              </div>
            );
          })
        }
      </div>
    );
  }
}

export default connect()(PromotionList);
