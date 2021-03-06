//
// Inclass Virtual DOM Exercise
// ============================
//
// You need to implement createElement() and updateElement()
//
;(function(exports) {

'use strict'

function h(tag, props, ...children) {
    return { tag, props: props ? props : { }, 
        children: Array.isArray(children[0]) ? children[0] : children }
}

function createElement(node) {
	console.log('Create element called for', node)
	// create the element and return it to the caller
	// the node might have event listeners that need to be registered
	// the node might have children that need to be created as well
    var e
    if(typeof node === 'string'){
        e = document.createTextNode(node);
    } else{
        e = document.createElement(node.tag);
        if (typeof node.props !== 'undefined'){
            for (var i = 0; i < Object.keys(node.props).length; i++) {
                var att
                if (Object.keys(node.props)[i] === "className"){
                    att = document.createAttribute("class");
                } else if(Object.keys(node.props)[i] === "onclick" || Object.keys(node.props)[i] === "onClick"){
                    console.log("Registering event handler", Object.values(node.props)[i])
                    e.addEventListener("click", Object.values(node.props)[i], false);
                    e.addEventListener("click", update)
                    att = document.createAttribute(Object.keys(node.props)[i]); 
                } else{
                    att = document.createAttribute(Object.keys(node.props)[i]); 
                }
                att.value = Object.values(node.props)[i]
                e.setAttributeNode(att)
            };
        }
        if (typeof node.children !== 'undefined'){
            for (var i = 0; i < node.children.length; i++) {
                e.appendChild(createElement(node.children[i]))
            };
        }
    } 
    console.log(e)
	return e
}

function changed(node1, node2) {
    return typeof node1 !== typeof node2 ||
            (typeof node1 === 'string' && node1 !== node2) ||
            node1.tag !== node2.tag ||
            (node1.props && node2.props && 
            	node1.props.id && node2.props.id && 
            	node1.props.id != node2.props.id)
}

function updateElement(parent, newNode, oldNode, index=0) {
	// index will be needed when you traverse children
	// add the new node to the parent DOM element if
	// the new node is different from the old node 
	// at the same location in the DOM.
	// ideally we also handle inserts, but ignore that functionality for now.

    if (!oldNode) {
        console.log('no oldNode')
        parent.appendChild(createElement(newNode))
    } else {
    	console.log('update element that may have changed')
        console.log('parent', parent, 'new', newNode, 'old', oldNode)
    	// you can use my changed(node1, node2) method above
    	// to determine if an element has changed or not
        if (changed(newNode, oldNode)){
            var node = createElement(newNode)
            for (var i = index; i < node.childNodes.length; i++) {
                // updateElement(node.childNodes[i], )
            };
            parent.replaceChild(node, createElement(oldNode))
        }
    	// be sure to also update the children!
    }
}

const deepCopy = (obj) => {
    if (obj === null || typeof(obj) !== 'object')
        return obj;
    const props = {}
    if (obj.props) {
        for (let p in obj.props) {
            props[p] = obj.props[p]
        }
    }
    return h(obj.tag, props,
        Array.isArray(obj.children) ? obj.children.map(deepCopy) : obj.children)
}

const update = () => requestAnimationFrame(() => {
	// compare the current vdom with the original vdom for updates
    updateElement(h.mounted.root, h.mounted.current, h.mounted.original)
    h.mounted.original = deepCopy(h.mounted.current)
})

h.mount = (root, component) => {
    // we keep a copy of the original virtual DOM so we can diff it later for updates
    const originalComponent = deepCopy(component)
    h.mounted = { root: root, current: component, original: originalComponent }
    updateElement(root, originalComponent)
}

exports.h = h

})(window);