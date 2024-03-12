import { v4 } from "uuid";
import { statusOptions, typeOptions } from "../constants";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import store from "../redux/store";
import { createJob } from "../redux/slice/jobSlice";

const AddJob = () => {
  const jobState = useSelector((store) => store.jobReducer);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const newJobData = Object.fromEntries(formData.entries());

    //tarih ve id ekle
    newJobData.date = new Date().toLocaleDateString("tr");
    newJobData.id = v4();

    //api'a verileri ekle
    axios
      .post("http://localhost:3001/jobs", newJobData)
      .then(() => {
        toast.success("Yeni İş Başarıyla Eklendi.");
        //store' da ekle
        dispatch(createJob(newJobData));
        navigate("/");
      })
      .catch(() => {
        toast.error("Ekleme İşleminde Sorun Oluştu !");
      });
  };

  //dizideki değerleri aynı olan elemanları kaldır
  const removeDuplicates = (key) => {
    //sadece pozisyonlardan oluşan bir dizi tanımla
    const arr = jobState?.jobs.map((job) => job[key]);
    // dizi içerisinden tekrar eden elemanı kaldır
    const filtred = arr.filter((item, index) => arr.indexOf(item) === index);

    //fonksiyonun çağrıldığı yere döndür

    return arr;
  };

  return (
    <div className="add-page">
      <section className="add-sec">
        <h2>Yeni İş Ekle</h2>

        <form onSubmit={handleSubmit}>
          <div>
            <label>Pozisyon</label>
            <input list="positions" name="position" type="text" required />
            <datalist id="positions">
              {removeDuplicates("position").map((i) => (
                <option key={i} value={i} />
              ))}
            </datalist>
          </div>

          <div>
            <label>Şirket</label>
            <input list="companys" name="company" type="text" required />
            <datalist id="companys">
              {removeDuplicates("company").map((i) => (
                <option key={i} value={i} />
              ))}
            </datalist>
          </div>

          <div>
            <label>Lokasyon</label>
            <input list="locations" name="location" type="text" required />
            <datalist id="locations">
              {removeDuplicates("location").map((i) => (
                <option key={i} value={i} />
              ))}
            </datalist>
          </div>

          <div>
            <label>Durum</label>
            <select name="status" required>
              <option hidden value={""}>
                Seçiniz
              </option>
              {statusOptions.map((text) => (
                <option key={text} value={text}>
                  {text}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label>Tür</label>
            <select name="type" required>
              <option hidden value={""}>
                Seçiniz
              </option>
              {typeOptions.map((text) => (
                <option key={text} value={text}>
                  {text}
                </option>
              ))}
            </select>
          </div>

          <div>
            <button id="btn1">
              <span> Ekle</span>
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default AddJob;
