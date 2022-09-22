import { render, screen } from "@testing-library/react";
import DetailPage, { DetailStaticPropsResult, getStaticProps } from "dh/pages/detalle";
import { GetStaticPropsResult } from "next";


describe('Detalle', () => {
    describe('when rendering default page', () => {
        xit('should render the heading', () => {
            render(<DetailPage />)
            expect(screen.getByText("Detalle")).toBeInTheDocument();
        })
    })
    describe('when fetching static props', () => {
        it('should return the first name', async () => {
            const result: any  = getStaticProps({})
            expect(result.props.firstName.length).toBe(2);
        })
    })
});