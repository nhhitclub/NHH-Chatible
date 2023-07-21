import { useRouter } from "next/router"

export default function () {
    const { query } = useRouter();

    return (
        <div className="container">
            <div className="row pt-4 justify-content-center">
                <h4 className="col-12 mb-5 card-title text-center display-5 text-uppercase">báo cáo đoạn chat</h4>
                <form method="post" className="col-12 col-md-8">
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">
                            Địa chỉ email của bạn
                        </label>
                        <input type="email" required className="form-control" name="email" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">
                            Vấn đề bạn đang gặp phải với đoạn chat
                        </label>
                        <select className="form-select" defaultValue="" name="issue_content" required>
                            <option></option>
                            <option value="sexual_content">Nội dung đồi trụy</option>
                            <option value="violent_content">Nội dung bạo lực</option>
                            <option value="illegal_promote_content">Nội dung cổ xúy tệ nạn xã hội</option>
                            <option value="bullying_content">Nội dung quấy rối, bắt nạt</option>
                            <option value="promote_terrorism">Nội dung bạo động, chống phá nhà nước</option>

                        </select>
                    </div>
                    <div className="mb-5">
                        <label htmlFor="description" className="form-label">
                            Mô tả
                        </label>
                        <textarea className="form-control" name="description" rows={3}>

                        </textarea>
                    </div>
                    <div className="mb-1">
                        <button type="submit" className="btn btn-dark">Báo cáo</button>
                    </div>
                    <div className="mt-1">
                        <small style={{ fontSize: ".8em!important" }} className="text-muted fw-lighter fs-6">
                            Báo cáo của bạn sẽ được ghi nhận và kiểm tra bởi đội ngũ admin NHH Chatible.
                            <br />Report sent by uID {query.uid}. Thanks for your report!
                        </small>
                    </div>
                </form>
            </div>

        </div>
    )

}