import React from 'react'
import TestUtils from 'react-addons-test-utils'
import { findDOMNode } from 'react-dom'
import { expect } from 'chai'

import { ToDoItem } from './todoItem'

const findByClassname = (children, classname) => {
    const result = Array.prototype.filter.call(children, it => it.className.indexOf(classname) >= 0)
    return result.length ? result[0] : null
}

describe('Validate ToDoItem', () => {

    it('should display a single ToDo with text', () => {
        // use TestUtils.renderIntoDocument
        const node = TestUtils.renderIntoDocument(<div><ToDoItem id={0} text="test" done={false} toggle={_=>_} remove={_=>_}/></div>)
        // findDOMNode and assert 3 children of the ToDoItem element
        const element = findDOMNode(node).children[0]
        expect(element.children).to.have.length(3)
        // assert the innerHTML of the todo is the text you initially set
        expect(element.children[1].innerHTML).to.be.equal("test")
    })

    it('should display a single ToDo with no classname', () => {
        // use TestUtils.renderIntoDocument
        const node = TestUtils.renderIntoDocument(<div><ToDoItem id={0} text="test" done={false} toggle={_=>_} remove={_=>_}/></div>)
        // findDOMNode and assert 3 children of the ToDoItem element
        const element = findDOMNode(node).children[0]
        expect(element.children).to.have.length(3)
        // assert there is no child with classname 'completed'
        expect(element.children[0]).to.not.have.property("classname")
        expect(element.children[1]).to.not.have.property("classname")
        expect(element.children[2]).to.not.have.property("classname")
    })

    it('should toggle completed when clicked', () => {
        let toggled = false
        // use TestUtils.renderIntoDocument
        const node = TestUtils.renderIntoDocument(<div><ToDoItem id={0} text="test" done={false} toggle={() => { toggled = !toggled}} remove={_=>_}/></div>)
        // when the checkbox is clicked via TestUtils.Simulate.click()
        const element = findDOMNode(node).children[0]
        TestUtils.Simulate.click(element.children[0])
        // we expect the variable toggled to be true
        expect(toggled).to.be.true
    })

    it('should remove an item when clicked', () => {
        let removed = false
        // use TestUtils.renderIntoDocument
        const node = TestUtils.renderIntoDocument(<div><ToDoItem id={0} text="test" done={false} toggle={_=>_} remove={() => { removed = true}}/></div>)
        // when the remove button is clicked via TestUtils.Simulate.click()
        const element = findDOMNode(node).children[0]
        TestUtils.Simulate.click(element.children[2])
        // we expect the variable removed to be true
        expect(removed).to.be.true
    })

    it('should display a completed ToDo', () => {
        // use TestUtils.renderIntoDocument
        const node = TestUtils.renderIntoDocument(<div><ToDoItem id={0} text="test" done={true} toggle={_=>_} remove={_=>_}/></div>)
        // the item should have done=true
        const element = findDOMNode(node).children[0]
        const item = element.children[1]
        // assert that the rendered className is "completed"
        expect(item.className).to.be.equal("completed")
    })

})
