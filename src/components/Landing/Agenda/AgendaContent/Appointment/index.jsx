import { useEffect, useState } from "react";
/* Components */
import { Form, TimePicker, Calendar, theme, Row, ConfigProvider } from "antd";
/* Helpers */
import dayjs from "dayjs";
import moment from "moment";
import esES from "antd/lib/locale/es_ES"; //
/* Hooks*/
import useAppointment from "../../../../../hooks/useAppointment";
import "./style.css";
/**
 * @param {{ setForm: () => void }} props
 */
function AppointmentForm({ setForm }) {
  const [hourValue, setHourValue] = useState(null);
  const [selectedHour, setSelectedHour] = useState("");
  const { getUnavailableTimesOfDay, unavailableTimes } = useAppointment();
  const [form] = Form.useForm();
  const { token } = theme.useToken();
  const wrapperStyle = {
    maxWidth: 500,
    border: `1px solid ${token.colorBorderSecondary}`,
    borderRadius: token.borderRadiusLG,
  };

  useEffect(() => {
    setForm(form), [form];
  }, [form]);

  useEffect(() => {
    getUnavailableTimesOfDay(dayjs().format("DD/MM/YYYY"));
    form.setFieldsValue({
      date: dayjs().format("DD/MM/YYYY"),
    });
  }, []);

  const disabledDate = (current) => {
    // Disable dates before the current day
    const isBeforeToday = current && current < moment().startOf("day");

    // Disable dates after 1 month from today
    const isAfterOneMonth =
      current && current > moment().add(1, "month").startOf("day");
    const isToday = current.isSame(moment(), "day");
    const isAfterWorkHours = current && current.hour() > 17;

    return isBeforeToday || isAfterOneMonth || (isToday && isAfterWorkHours);
  };

  const disabledTime = (current) => {
    const disabledMinutes = [];
    const currentHour = moment().hour();

    // Create an array of hours including all hours before the current hour
    let disabledHours = [];
    if (form.getFieldValue("date").length) {
      if (form.getFieldValue("date") === dayjs().format("DD/MM/YYYY")) {
        for (let i = 0; i < currentHour; i++) {
          disabledHours.push(i);
        }
      }
    }


    // Add the specific hours you want to disable
    const additionalDisabledHours = [
      0, 1, 2, 3, 4, 5, 6, 7, 17, 18, 19, 20, 21, 22, 23,
    ];

    // Combine both arrays to get the final array of disabled hours
    const allDisabledHours = [...disabledHours, ...additionalDisabledHours];

    if (unavailableTimes.length) {
      unavailableTimes.forEach((unavailableTime) => {
        if (selectedHour === unavailableTime.split(":")[0]) {
          disabledMinutes.push(Number(unavailableTime.split(":")[1]));
        }
      });
    }
    return {
      disabledHours: () => allDisabledHours,
      disabledMinutes: () => disabledMinutes,
    };
  };

  return (
    <Form
      form={form}
      layout="vertical"
      name="car"
      labelCol={{
        span: 30,
      }}
      style={{
        maxWidth: 700,
      }}
      initialValues={{
        remember: true,
      }}
      autocomplete="off"
    >
      <div className="appointment-form-container">
        <p className="appointment-info-title"> Ingrese la fecha deseada</p>
        <div className="appointment-fields-container">
          <Row>
            <Form.Item
              label="Fecha"
              name="date"
              rules={[
                {
                  required: true,
                  message: "Por favor ingrese una fecha",
                },
              ]}
            >
              <div style={wrapperStyle}>
                <ConfigProvider locale={esES}>
                  <Calendar
                    onSelect={(date) => {
                      getUnavailableTimesOfDay(
                        dayjs(date).format("DD/MM/YYYY")
                      );
                      form.setFieldValue(
                        "date",
                        dayjs(date).format("DD/MM/YYYY")
                      );
                    }}
                    fullscreen={false}
                    disabledDate={(current) => {
                      return disabledDate(current);
                    }}
                  />
                </ConfigProvider>
              </div>
            </Form.Item>
          </Row>
          <Row>
            <Form.Item
              label="Hora"
              name="time"
              rules={[
                {
                  required: true,
                  message: "Por favor ingrese una hora",
                },
              ]}
            >
              <TimePicker
                value={hourValue}
                onChange={(value) => {
                  setHourValue(value);
                }}
                inputReadOnly
                showNow={false}
                placeholder="Seleccionar hora"
                size="large"
                format={"HH:mm"}
                minuteStep={20}
                disabledTime={disabledTime}
                onSelect={(value) => {
                  setSelectedHour(dayjs(value).format("HH"));
                }}
              />
            </Form.Item>
          </Row>
        </div>
      </div>
    </Form>
  );
}
export default AppointmentForm;
