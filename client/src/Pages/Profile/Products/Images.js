import { Button, Upload } from "antd";


function Images(
  selectedProduct,
  setShowProductForm,
  getData
) {
  return <div>
    <Upload listType="picture" beforeUpload={() => false}>
      <Button type="default">
        Upload Image
      </Button>
    </Upload>
  </div>;
}
export default Images;
