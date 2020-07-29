import React, {Component} from 'react';
import axios from 'axios'
import './App.css'
import ItemTable from "./components/itemTable";
import Filter from "./components/filter";

//定义组件
class App extends Component {
//初始化状态
    constructor(props) {
        super(props);
        this.state = {
            list:[{
              id:'',
              name:''
            }]
        }
    }

    render() {
        console.log('Render App')
        return (
            <div className="container-fluid" style={{marginTop: '20px'}}>
                <div className="row">
                    {/*信息表格*/}
                    <ItemTable
                        list={this.state.list}
                        deleteItem={this.deleteItem}
                        changeItem={this.changeItem}
                    />

                    <div className="col-xs-3 col-xs-offset-1">
                        <form className="form-horizontal">
                            <div className="form-group">
                                <label htmlFor="name" className="col-xs-3">用户名</label>
                                <div className="col-xs-8">
                                    <input type="text" id="name" className="form-control" value={this.state.name}
                                           onChange={(e) => {
                                               this.setState({name: e.target.value})
                                           }}/>
                                </div>

                            </div>
                            <div className="form-group">
                                <div className="col-sm-offset-2 col-sm-10">
                                    <button className="btn btn-default" onClick={this.handleFormSubmit}>提交</button>
                                </div>
                            </div>
                        </form>
                    </div>

                    <Filter myfilter={this.myFilter}/>
                </div>

            </div>
        );
    }

//
    componentDidMount() {
        let self = this;
        setTimeout(function () {
            self.query();
        }, 500)

    }

    query = () => {
        axios.get('/user/query').then(({data}) => {
            this.setState({
                list: data
            });
        })
    };

    //修改
    changeItem = (item) => {
        axios.post(`/user/post`,{id:item.id,name: item.name}).then(({data}) => {
            console.log(data);
            let rowData = this.state.list;
            for (let i in rowData) {
                let unit = rowData[i]
                if (unit.id === item.id) {
                    console.log("change")
                    rowData[i].name=item.name
                }
            }
            this.setState({list: rowData});
            //[{"id":5,"name":"ads"},{"id":6,"name":"as"},{"id":7,"name":"asdas"},{"id":8,"name":"as"},{"id":9,"name":"asdadzzz"},{"id":10,"name":"asd"},{"id":11,"name":"ad"},{"id":12,"name":"asda"},{"id":13,"name":"11"}]
        })
    };

    //删除
    deleteItem = (item) => {
        //axios.delete(`/user/${item.id}`).then(({data}) => {
        axios.get(`/user/delete`,{params:{id:item.id}}).then(({data}) => {
            console.log(data);
            let rowData = this.state.list;
            for (let i in rowData) {
                let unit = rowData[i];
                if (unit.id === item.id) {
                    console.log("delete")
                    delete rowData[i];
                }
            }
            this.setState({list: rowData});
            //[{"id":5,"name":"ads"},{"id":6,"name":"as"},{"id":7,"name":"asdas"},{"id":8,"name":"as"},{"id":9,"name":"asdadzzz"},{"id":10,"name":"asd"},{"id":11,"name":"ad"},{"id":12,"name":"asda"},{"id":13,"name":"11"}]
        })
    };

    //提交
    handleFormSubmit = (e) => {
        e.preventDefault();
        if (this.state.name !== '') {
            axios.post('/user/post', {id: !this.state.id ? '' : this.state.id, name: this.state.name}).then(({data}) => {
                this.setState({
                    id: '',
                    name: ''
                });
                this.query();
            })
        }
    }
    myFilter = (list) => {

        this.setState({ list })
    }
}

export default App;
