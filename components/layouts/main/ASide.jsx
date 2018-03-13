'use strict';
import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import {MultiLevelMenu, MenuItem} from 'components/UI/Menu';
import {connect} from 'react-redux';
import getMenu from './menu';

class ASide extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      menuItems: getMenu()
    }
  }

  componentDidMount() {
    $(this.refs['sidebarmenu']).tree();
    // $(".treeview-menu").show();

    $('ul').on('expanded.tree', (e) => {

    });

    $('ul').on('collapsed.tree', () => {

    });
  }

  render() {
    return (
      <aside className="main-sidebar">
        <section className="sidebar">
          <div className="user-panel">
            <div className="pull-left image">
              <img src={require("assets/images/user2-160x160.jpg")} className="img-circle" alt="User Image"/>
            </div>
            <div className="pull-left info">
              <p>Alexander Pierce</p>
              <a href="#"><i className="fa fa-circle text-success"></i> Online</a>
            </div>
          </div>
          <form action="#" method="get" className="sidebar-form">
            <div className="input-group">
              <input type="text" name="q" className="form-control" placeholder="Search..."/>
              <span className="input-group-btn">
                <button type="submit" name="search" id="search-btn" className="btn btn-flat"><i className="fa fa-search"></i>
                </button>
              </span>
            </div>
          </form>
          <ul className="sidebar-menu" ref='sidebarmenu'>
            <li className="header">Menu</li>
            {
              this.state.menuItems.map(item => {
                if (item.items && item.items.length > 0) {
                  return (
                    <li className={`treeview ${this.props.menu == item.id ? 'menu-open' : ''}`}>
                      <a href="#">
                        <i className={item.class}></i> <span>{item.name}</span>
                      </a>
                      <ul className="treeview-menu" style={{display: `${this.props.menu == item.id ? 'block': 'none'}`}}>
                        {
                          item.items.map(subMenuItem => {
                            return <MenuItem to={subMenuItem.link} label={subMenuItem.name}/>
                          })
                        }
                      </ul>
                    </li>
                  )
                } else {
                  return <MenuItem to={item.link} label={item.name}/>
                }
              })
            }

          </ul>
        </section>
      </aside>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    menu: state.menu
  }
}

export default withRouter(connect(mapStateToProps)(ASide));
