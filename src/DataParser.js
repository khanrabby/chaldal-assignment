var jsonData = require('./data/categories.json');

function compare(a,b) {
    if (a.DisplayOrder < b.DisplayOrder)
      return -1;
    if (a.DisplayOrder > b.DisplayOrder)
      return 1;
    return 0;
}

function getNestedChildren(arr, parent) {
  var out = []
  for(var i in arr) {
      if(arr[i].ParentCategoryId == parent) {
          var children = getNestedChildren(arr, arr[i].Id).sort(compare)

          if(children.length) {
              arr[i].children = children
          }

          if(arr[i].ParentCategoryId === 0) arr[i].root = true;
          out.push(arr[i])
      }
  }
  return out
}

function constructChildren(node,search) {
        let children = [];
        if (node.children) {
            for(var i in node.children)
            {
                let temChildrenArr = [];
                temChildrenArr =constructChildren(node.children[i],search);

                if(temChildrenArr.length != 0)
                {
                    // array not empty
                    if(!(temChildrenArr.length == 1 && temChildrenArr[0].Id === node.children[i].Id))
                    {
                        node.children[i].children = temChildrenArr;
                    }
                    // else{
                    //     node.children[i].children = temChildrenArr;
                    // }
                    children.push(node.children[i]);
                }
                else{
                    if(node.children[i].Name.toLowerCase().includes(search.toLowerCase()))
                    {
                        if(node.children[i].children)
                        {
                            delete node.children[i].children;
                        }
                        children.push(node.children[i]);
                    }
                }
            }
        } 
        else {
            if(node.Name.toLowerCase().includes(search.toLowerCase()))
            {
                children.push(node);
            }
        }

        return children;   
}

export function GetFilteredData(searchString) {
    searchString = searchString.trim()

    let filteredArray =  getNestedChildren(jsonData,0); 
    
    if(searchString != "")
    {            
        for(var i in filteredArray)
        {
            let childrenArr = []
            
            childrenArr = constructChildren(filteredArray[i],searchString);
            if(childrenArr.length > 0 )
            {
                if(!(childrenArr.length == 1 && childrenArr[0].Id === filteredArray[i].Id))
                {
                    filteredArray[i].children = childrenArr
                }
            }
            else{
                if(filteredArray[i].children)
                {
                    delete filteredArray[i].children;
                }
            }
        }
    }
    return filteredArray;
}
