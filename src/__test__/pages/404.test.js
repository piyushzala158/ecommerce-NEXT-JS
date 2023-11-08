import { render } from "@testing-library/react"
import Custom404 from "../../pages/404"
import '@testing-library/jest-dom'

describe("404 page",() => {
    it("Should render properly",()=> {
        const { getByTestId }  = render(<Custom404/>)
        expect(getByTestId("404")).toBeInTheDocument()
    })
})