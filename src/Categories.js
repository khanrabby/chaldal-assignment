import React,{Component} from 'react';

class Categories extends Component{

    constructor(props) {
        super(props);
        this.state = { 
            categoryData: props.category,
            searchQuery : this.props.searchQuery
        };
    }
    

    renderCategory(root) {
        if (root.children && root.children.length > 0) {
            return (
                <div key={root.Id}>
                    <h6> {root.Name} </h6>
                    <ul>  
                        {root.children.map(c =>  (<li key={c.Id}>{this.renderCategory(c)} </li>))}
                    </ul>
                    <br/>
                </div>
            );
        } 
        else {
            return <h6 key={root.Id}> {root.Name} </h6>;
        }   
    }

    render()
    {
        return(
            <div className="row text-left" >
            
                <div className="col-md-2"></div>
                <div className="col-md-8">
                
                {this.props.category.map(function(category) {
                    return this.renderCategory(category)

                },this)}
                </div>
            </div>
        );
    }
}

export default Categories;