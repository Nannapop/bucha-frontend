import React from 'react'
import './Contact.css'
import msg_icon from '../../assets/msg-icon.png'
import mail_icon from '../../assets/mail-icon.png'
import phone_icon from '../../assets/phone-icon.png'
import location_icon from '../../assets/location-icon.png'
import White_arrow from '../../assets/white-arrow.png'
import Title from '../Title/Title'

const Contract = () => {

  const [result, setResult] = React.useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("กำลังส่งข้อความ...");
    const formData = new FormData(event.target);

    formData.append("access_key", "44c0a7b1-fb4e-4673-a6ac-57709da51015");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (data.success) {
      setResult("ส่งข้อความเรียบร้อยแล้ว ขอบคุณครับ");
      event.target.reset();
    } else {
      console.log("Error", data);
      setResult(data.message);
    }
  };


  return (
    <div className='con-container'>
      <Title subTitle="เรายินดีรับฟังความคิดเห็นจากคุณเสมอ" title="ติดต่อเรา" />
    <div className='contact'> 
      <div className="contact-col">
        <h3>ติดต่อกับพวกเรา <img src={msg_icon} alt="" /></h3>
        <p>เรายินดีรับฟังความคิดเห็นจากคุณเสมอ! ไม่ว่าคุณจะมีคำถามเกี่ยวกับบริการของเรา
          หรือต้องการปรึกษาเกี่ยวกับโครงการที่สนใจ ข้อความของคุณสำคัญสำหรับเรา
          และเราจะพยายามอย่างเต็มที่เพื่อตอบกลับโดยเร็วที่สุด
          คุณสามารถใช้ช่องทางการติดต่อเพื่อส่งข้อความถึงเราโดยตรง
          หรือติดต่อเราทางอีเมลหรือโทรศัพท์ เรายินดีที่จะนัดหมายการประชุม
          หรือนัดหมายเวลาที่คุณสะดวก</p>
        <ul>
          <li><img src={mail_icon} alt="" />buchaengineering@hotmail.com</li>
          <li><img src={phone_icon} alt="" />087-532-8087, 065-410-0562</li>
          <li><img src={location_icon} alt="" />เลขที่ 122/2 หมู่ 1 ต.ช่องสาริกา อ.พัฒนานิคม  จ.ลพบุรี 15220</li>
        </ul>
      </div>
      <div className="contact-col">
        <form onSubmit={onSubmit}>
        <label>ชื่อ</label>
          <input type="text" name='name' placeholder='ENTER YOUR NAME' required/>
          <label>เบอร์โทรศัพท์</label>
          <input type="tel" name='phone' placeholder='ENTER YOUR PHONE NUMBER' required/>
          <label>ข้อความของคุณ</label>
          <textarea name="message" rows="6" placeholder="ENTER YOUR MESSAGE" required></textarea>
          <button button type='submit' className='btn dark-btn'>ส่งข้อความ <img src={White_arrow} alt="" /></button>
        </form>
        <span>{result}</span>
      </div>
    </div>
    </div>
  )
}

export default Contract
