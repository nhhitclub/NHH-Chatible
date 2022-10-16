import React from "react"

export default function () {
    return (
        <>
            <div className="container">
                <div>chỗ này cho margin nha</div>
                <div className="card text-left">
                    <div className="card-body">
                        <h4 className="card-title">Chào bé, đăng nhập đi bé</h4>
                        <form>
                            <label>Tên đăng nhập</label>
                            <input type="text" name="name" className="form-control"/>
                            <label>Mật khẩu</label>
                            <input type="text" name="name" className="form-control"/>
                            <div>Đây là nút đăng nhập</div>
                            <input type="submit" value="Đăng nhập" className="btn btn-primary" /> 
                            <div>Đây cũng là nút đăng nhập</div>
                            <input type="submit" value="Cũng là đăng nhập nhưng là màu xanh" className="btn btn-success" />
                            <div>Chỗ này mới là nút đăng nhập nè</div>
                            <input type="submit" value="Cũng là đăng nhập nhưng là màu đỏ" className="btn btn-danger" />
                        </form>
                    </div>
                </div>
            </div>
        </>
    )

}