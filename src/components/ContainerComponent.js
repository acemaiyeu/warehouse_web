import React from 'react'
import { connect } from 'react-redux'
class ContainerComponent extends React.Component{
    render() {
        return (
            <div>ContainerComponent</div>
            
        )
    }
}
const mapStateToProps = (state) => {
    return {
        counter: state.counter
    }
}
export default connect(mapStateToProps)(ContainerComponent);