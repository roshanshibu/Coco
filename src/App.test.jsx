import 'jsdom-global/register';
import { mount } from "enzyme"
import { MemoryRouter } from "react-router-dom"
import App from "./App"
import React from "react"

describe('App Component', () => {
    let wrapper = null

    const component = (path) => {
        return mount(
            <MemoryRouter initialEntries={[`${path}`]}> 
                <App />
            </MemoryRouter>
            ) //for deep rendering of App component
    }

    beforeEach(() => {
        wrapper = component();
    })
    it("is Rendered", () => {
        const app = wrapper.find({"data-testid":"chorusPage"})
        expect(app.length).toBe(0)
    })
})