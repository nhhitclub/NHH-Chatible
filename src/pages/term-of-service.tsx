import React from "react"
import CollapseDropdown from "../webComponent/CollapseDropdown"

export default function () {
    return (
        <>
            <div className="container">
                <br /><br />
                <div className="card text-left">
                    <div className="card-body">
                        <h4 className="card-title text-center">Điều khoản sử dụng</h4>

                        <div className="container">
                            <ul>
                                <li>Đây là điều khoản chung được lập ra để tạo ra một cộng động lành mạnh, phù hợp chung</li>
                                <li>Những điều luật này có thể thay đổi bất kì lúc nào mà không được báo trước</li>
                                <li>Bằng việc đồng ý điều khoản, bạn đã đồng ý với tất cả các điều luật dưới đây</li>
                            </ul>
                            <div className="col-12">
                                <CollapseDropdown title="Điều khoản sử dụng">
                                    <ol>
                                        <li className="mb-2">Chấp hành theo Hiến pháp, Pháp luật nhà nước CHXHCNVN</li>
                                        <li className="mb-2">Yêu tổ quốc, yêu đồng bào</li>
                                        <li className="mb-2">Không tìm cách can thiệp hoặc truy cập sâu vào hệ thống</li>
                                        <li className="mb-2">Quyền quyết định của các quản trị viên là quyền quyết định cuối cùng</li>
                                    </ol>
                                </CollapseDropdown>
                            </div>
                            <div className="col-12">
                                <CollapseDropdown title="Luật khung chat">
                                    <ol>
                                        <li className="mb-2">Không xúc phạm lẫn nhau trong khung chat (nhất là fan MU)</li>
                                        <li className="mb-2">Không truyền bá các văn hóa phẩm "đồ trụy"</li>
                                        <li className="mb-2">Hạn chế chửi thề hoặc dùng các từ lóng tối đa/</li>
                                    </ol>
                                </CollapseDropdown>
                            </div>

                        </div>
                    </div>
                </div>
                <small>Được viết bởi admin</small>
            </div>
        </>
    )

}