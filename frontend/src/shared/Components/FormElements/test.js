import 'moment/locale/ru'
moment.locale('ru')
  const str = date.format('MMMM');
  {str.charAt(0).toUpperCase() + str.slice(1)}

// const Calender = (props) => {
//   const [startDate, setStart] = useState(moment().add(1, 'day'));
//   const [endDate, setEnd] = useState(moment().add(5, 'day'));
//   const [date, setDate] = useState(moment());
//   const [isValid, setIsValid] = useState(false);
//   const [date_range, setDateRange] = useState([]);
  

//   setStart()
//   const resetDate = () => {
//     setDate(moment());
//   }

//   const changeMonth = (month) => {
//     setDate(date.month(month))
//   }

//   const changeYear = (year) => {
//     setDate(date.year(year))
//   }

//   const changeDate = (date) => {

//     if (startDate === null || date.isBefore(startDate, 'day') || !startDate.isSame(endDate, 'day')) {
//       setStart(moment(date))
//       setEnd(moment(date))
//     } else if (date.isSame(startDate, 'day') && date.isSame(endDate, 'day')) {
//       setStart(null)
//       setEnd(null)
//     } else if (date.isAfter(startDate, 'day')) {
//       setEnd(moment(date))
//     }
//     date_range = [moment(startDate).format("DD/MM/YYYY"), moment(endDate).format("DD/MM/YYYY") ];
//     setIsValid (true);
  
//   }

//   return (

//       React.createElement("div", {  className: "calendar" }, /*#__PURE__*/
//       React.createElement(Heading, 
//         { date: date, 
//           changeMonth: month => changeMonth(month), 
//           changeYear: year => changeYear(year), 
//           resetDate: () => resetDate() 
//         }), /*#__PURE__*/

//       React.createElement(Days, 
//         { onClick: date => changeDate(date), 
//           date: date, 
//           startDate: startDate, 
//           endDate: endDate })
//        )
  
//   ); 

// }

//export default Calender


