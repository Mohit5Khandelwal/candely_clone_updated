import { Suspense } from "react";

export default function AvilabilityLayout({children}) {

    return (
        <div className="mx-auto">
            <Suspense fallback={ <div> Loading Data.... </div>}>
                {children}
            </Suspense>

        </div>
    )

}