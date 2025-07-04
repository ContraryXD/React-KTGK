export default function Breadcrumb({a, b}) {
    return (
        <div className="breadcrumb-section breadcrumb-bg">
            <div className="container">
                <div className="row">
                    <div className="col-lg-8 offset-lg-2 text-center">
                        <div className="breadcrumb-text">
                            <p>{a}</p>
                            <h1>{b}</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}