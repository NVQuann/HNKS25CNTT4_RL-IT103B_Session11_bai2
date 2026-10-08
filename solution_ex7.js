const smartHomeDevices = [
  {
    id: "DEV_001",
    name: "Điều hòa",
    room: "Phòng Khách",
    powerWatts: 2000,
    isActive: false,
  },
  {
    id: "DEV_002",
    name: "Đèn ngủ",
    room: "Phòng Ngủ",
    powerWatts: 15,
    isActive: true,
  },
];

const generateDeviceId = () => {
  const randomNum = Math.floor(Math.random() * 900) + 100;
  return `DEV_${randomNum}`;
};

const validateDevice = (device) => {
  if (!device.name || device.name.trim() === "") return false;
  if (!device.room || device.room.trim() === "") return false;
  if (device.powerWatts === undefined || device.powerWatts <= 0) return false;
  return true;
};

const createDevice = (list, newDev) => {
  if (!validateDevice(newDev)) {
    console.log(
      "Thêm thất bại: Dữ liệu không hợp lệ (Cần tên, phòng, và công suất > 0).",
    );
    return null;
  }

  const newDeviceWithId = {
    id: generateDeviceId(),
    name: newDev.name,
    room: newDev.room,
    powerWatts: newDev.powerWatts,
    isActive: newDev.isActive !== undefined ? newDev.isActive : false,
  };

  list.push(newDeviceWithId);
  console.log(
    `Đã thêm thiết bị mới: [${newDeviceWithId.id}] ${newDeviceWithId.name}`,
  );
  return newDeviceWithId;
};

const readDevicesByRoom = (list, roomName) => {
  const filteredList = list.filter((device) => device.room === roomName);
  console.log(`=== DANH SÁCH THIẾT BỊ TẠI: ${roomName.toUpperCase()} ===`);
  if (filteredList.length === 0) {
    console.log("Không có thiết bị nào trong phòng này.");
  } else {
    console.table(filteredList);
  }
  return filteredList;
};

const updateDevice = (list, id, updatedData) => {
  const index = list.findIndex((dev) => dev.id === id);

  if (index === -1) {
    console.log(`Cập nhật thất bại: Không tìm thấy thiết bị có mã ${id}`);
    return false;
  }

  if (updatedData.name !== undefined) list[index].name = updatedData.name;
  if (updatedData.room !== undefined) list[index].room = updatedData.room;
  if (updatedData.powerWatts !== undefined)
    list[index].powerWatts = updatedData.powerWatts;
  if (updatedData.isActive !== undefined)
    list[index].isActive = updatedData.isActive;

  console.log(`Đã cập nhật thành công thiết bị: ${id}`);
  return true;
};

const deleteDevice = (list, id) => {
  const index = list.findIndex((dev) => dev.id === id);

  if (index === -1) {
    console.log(`Xóa thất bại: Không tìm thấy thiết bị có mã ${id}`);
    return false;
  }

  list.splice(index, 1);
  console.log(`Đã gỡ bỏ thiết bị: ${id}`);
  return true;
};

console.log("--- TÌNH TRẠNG HỆ THỐNG BAN ĐẦU ---");
console.table(smartHomeDevices);

console.log("--- TEST: CREATE ---");
const tv = createDevice(smartHomeDevices, {
  name: "Smart TV",
  room: "Phòng Khách",
  powerWatts: 150,
});
createDevice(smartHomeDevices, {
  name: "Quạt hỏng",
  room: "Phòng Khách",
  powerWatts: 0,
});

console.log("--- TEST: READ ---");
readDevicesByRoom(smartHomeDevices, "Phòng Khách");

console.log("--- TEST: UPDATE ---");
updateDevice(smartHomeDevices, tv.id, { isActive: false, powerWatts: 0 });
updateDevice(smartHomeDevices, "DEV_999", { isActive: true });

console.log("--- TEST: DELETE ---");
deleteDevice(smartHomeDevices, "DEV_002");

console.log("--- TÌNH TRẠNG HỆ THỐNG CUỐI CÙNG ---");
console.table(smartHomeDevices);
