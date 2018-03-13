import React, {PropTypes} from 'react';
import {MainLayout} from 'components/layouts';
import {Link, withRouter} from 'react-router-dom';
import {Contacts} from 'base/api';
import {Contact, ListContacts} from 'components/contacts';
import {toastr} from 'react-redux-toastr';

class ContactsContainer extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {

    }
  }

  confirmDelete(id, reload) {
    if (confirm("Bạn có muốn xóa thông tin liên hệ này không?")) {
      Contacts.actions.delete.request({id}).then(response => {
        toastr.removeByType('success');
        toastr.success("", "Thông tin liên hệ đã được xóa");
        reload();
      });
    }
  }

  updateField(item, fieldName, reload, e) {
    Contacts.actions.update.request({id: item.id}, {
      data: {
        [fieldName]: !item[fieldName]
      }
    }).then(response => {
       toastr.removeByType('success');
      toastr.success("Thành công", "Trạng thái của thông tin liên hệ đã được cập nhật thành công");
      reload();
    });
  }



  render() {
    return (
      <MainLayout>
        <div>
          <h3>Thông tin liên hệ</h3>
          <ListContacts
            actionPanel={(item, reload) => {
              return (
                <div>
                  <div className='row'>
                    <button className="btn btn-primary" type="button" onClick={this.confirmDelete.bind(this, item.id, reload)}>Xóa</button>
                  </div>
                </div>
              )
            }
            }
          />
        </div>
      </MainLayout>
    );
  }
}

export default ContactsContainer;
