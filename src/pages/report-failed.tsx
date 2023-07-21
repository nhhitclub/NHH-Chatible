export default function () {
    return (
        <div className="container">
            <div className="row vh-100 align-items-center justify-content-center">
                <div className="col-12 text-center">
                    <p className="mb-3 fs-1 fw-light text-uppercase">phiên báo cáo đã hết hạn</p>
                    <small style={{ fontSize: ".8em!important" }} className="text-muted fw-lighter fs-6">
                        Báo cáo không hợp lệ hoặc đã hết hạn.<br />
                        Vui lòng liên hệ đội ngũ quản trị viên nếu bạn nghĩ đây là lỗi.
                    </small>
                </div>
            </div>
        </div>
    )
}