import React, {Component} from 'react';
import axios from 'axios'
import PropTypes from 'prop-types'
//import './component/ItemTable'
//import ItemTable from "./ItemTable";
//定义组件
class Form extends Component {
//初始化状态

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            name: ''

        }
    }
    render() {
        return(
            <div className="col-md-4 col-md-offset-2">
                <form className="form-horizontal">
                    <div className="form-group">
                        <label htmlFor="id" className="col-xs-3">id</label>
                        <div className="col-xs-8">
                            <input type="text" id="id" className="form-control"  onChange={(e)=>{this.setState({id:e.target.value})}}/>

                        </div>
                        <label htmlFor="name" className="col-xs-3">name</label>
                        <div className="col-xs-8">
                            <input type="text" id="name" className="form-control"  onChange={(e)=>{this.setState({name:e.target.value})}}/>

                        </div>

                    </div>
                    <div className="form-group">
                        <div className="col-sm-offset-3 col-sm-10">
                            <button className="btn btn-default" onClick={this.handleForm}>提交</button>
                        </div>
                    </div>
                </form>

            </div>
        )
    }
    handleForm = (e) =>{
        e.preventDefault();
        if(this.state.id !== '' && this.state.name !== ''){
            axios.post('/user/post',{id:this.state.id,name:this.state.name}).then((res)=>{

                let ans = res.data
                if(ans===true){
                    this.props.myform(this.state.id,this.state.name)
                }

                this.setState({
                    id:'',
                    name:''
                });


            })
        }


    };

}
Form.propTypes={
    myform:PropTypes.func.isRequired
}
export default Form;