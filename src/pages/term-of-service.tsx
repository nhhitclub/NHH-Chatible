import React from "react"
import CollapseDropdown from "../webComponent/CollapseDropdown"

export default function () {
    return (
        <>
            <div className="container">
                <br /><br />
                <div className="card text-left">
                    <div className="card-body">
                        <div>
                        <h4 className="card-title text-center display-5 text-uppercase">Điều khoản sử dụng</h4>
                        <p className="text-center">Áp dụng cho toàn bộ hệ thống và các dịch vụ của NHH Chatible</p>
                        <div className="mb-5"></div>
                        </div>
                        <div className="container">
                            <ul>
                                <li>Đây là điều khoản chung được lập ra để tạo ra một cộng động lành mạnh, phù hợp chung</li>
                                <li>Những điều luật này có thể thay đổi bất kì lúc nào mà không được báo trước</li>
                                <li>Bằng việc đồng ý điều khoản, bạn đã đồng ý với tất cả các điều luật dưới đây</li>
                            </ul>
                            <div className="col-12">
                                <CollapseDropdown title="Điều khoản sử dụng chung">
                                    <ol>
                                        <li className="mb-2">Chấp hành theo Hiến pháp, Pháp luật nhà nước CHXHCNVN</li>
                                        <li className="mb-2">Yêu tổ quốc, yêu đồng bào</li>
                                        <li className="mb-2">Chịu trách nhiệm hoàn toàn với những lời nói của mình</li>
                                        <li className="mb-2">Không tìm cách can thiệp (hay có thể gọi là hack ) hoặc truy cập sâu vào hệ thống</li>
                                        <li className="mb-2">Quyền quyết định của các quản trị viên là quyền quyết định cuối  cùng</li>
                                    </ol>
                                </CollapseDropdown>
                            </div>
                            <div className="col-12">
                                <CollapseDropdown title="Luật khung chat">
                                    <ol>
                                        <li className="mb-2">Không xúc phạm lẫn nhau trong khung chat</li>
                                        <li className="mb-2">Không truyền bá các văn hóa phẩm "đồ trụy"</li>
                                        <li className="mb-2">Hạn chế chửi thề hoặc dùng các từ lóng tối đa/</li>
                                    </ol>
                                </CollapseDropdown>
                            </div>

                            <div className="col-12">
                                <CollapseDropdown title="Quyền riêng tư">
                                    <p>Chúng tôi sẽ lưu lại thông tin về các đoạn chat, các hình ảnh, các đoạn văn bản hay tất cả các tệp đính kèm, thông tin cá nhân về tất cả những cá nhân, thực thể tham gia vào đoạn chat để phục vụ cho nhiều mục đích, lý do khác nhau</p>
                                    <p>Các thông tin này cũng chính là các thông tin làm bằng chứng cho các hành độn của bạn trong khung chat</p>
                                </CollapseDropdown>
                            </div>
                        </div>
                    </div>
                </div>
                <small>Được viết bởi admin. Cập nhật lần cuối ngày 19/9/2022</small>
            </div>
        </>
    )

}