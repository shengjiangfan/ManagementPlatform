import React from 'react'
import PropTypes from 'prop-types'

class ItemTable extends React.Component {
    constructor(props) {
        super(props)
        this.state={
            changeable:false
        }

        this.deleteInfo = this.deleteInfo.bind(this)
        this.changeInfo = this.changeInfo.bind(this)
    }

    changeInfo(item){
        if (window.confirm(`确定修改吗?`)) {
            this.setState({changeable:false})
            this.props.changeItem(item)
        }
        this.setState({changeable:true})
    }

    deleteInfo(item) {
        if (window.confirm(`确定删除"${item.name}"的信息吗?`)) {
            this.props.deleteItem(item)
        }
    }

    render() {
        let list = this.props.list

        console.log('Render itemTable')
        return (
            <div className="col-xs-4 col-xs-offset-1">
                <table className="table table-bordered">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>用户名</th>
                        <th>操作</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        !!list && list.map(item => {
                            return (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td suppressContentEditableWarning
                                        contentEditable={this.state.changeable}
                                        onBlur={event=>{
                                            item.name=event.target.innerHTML;
                                            this.changeInfo(item)}}
                                    >{item.name}</td>
                                    <td>
                                        <button className="btn btn-primary"
                                                onClick={() => {this.setState({changeable: true})}}
                                        >修改
                                        </button>
                                        <button
                                            className="btn btn-danger" style={{marginLeft: '5px'}}
                                            onClick={() => {this.deleteInfo(item)}}
                                        >删除
                                        </button>
                                    </td>
                                </tr>

                            )
                        })
                    }
                    </tbody>
                </table>
            </div>
        )
    }
}

ItemTable.propTypes = {
    list: PropTypes.array.isRequired,
    deleteItem: PropTypes.func.isRequired,
    changeItem: PropTypes.func.isRequired
}

export default ItemTable