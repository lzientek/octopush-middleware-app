//      
import React, { Component } from 'react';
import { Layout, Menu } from 'antd';

                                                                  

const { Sider } = Layout;
              
                     
  

export default class HomePage extends Component        {
                 

    handleClick = ({ key }                 ) => {
        this.props.history.push(key);
    };

    render() {
        return (
            <Sider>
                <Menu onClick={this.handleClick} style={{ width: 256 }} mode="inline">
                    <Menu.Item key={'/parameters'}>Parameters</Menu.Item>
                    <Menu.Item key={'/templates'}>Templates</Menu.Item>
                    <Menu.Item key={'/stats'}>Stats</Menu.Item>
                    <Menu.Item key={'/send'}>Send</Menu.Item>
                </Menu>
            </Sider>
        );
    }
}
