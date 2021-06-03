interface SquareThemeData {
  readonly name: string;
  readonly icon?: string;
}

export const station = new Map<number, SquareThemeData>();
station.set(1, { name: "<- Go" });
station.set(2, { name: "Tsim Sha Tsui" });
station.set(4, { name: "Kwun Tong" });

station.set(5, { name: "Mong Kok" });

station.set(6, { name: "JFK" });


station.set(7, { name: "Kowloon Tong" });
station.set(9, { name: "Wong Tai Sin" });
station.set(10, { name: "Yau Tong" });

station.set(12, { name: "FanLing" });
station.set(14, { name: "Sham Tseng" });
station.set(15, { name: "Tin Shui Wai" });

station.set(16, { name: "Airport" });

station.set(17, { name: "Sha Tin" });
station.set(18, { name: "Rail Road", icon: "subway" });
station.set(19, { name: "Kwai Chung" });
station.set(20, { name: "Tseung Kwau O" });

station.set(22, { name: "Tung Chung" });
station.set(24, { name: "Lantau" });
station.set(25, { name: "Ocean Park" });

station.set(26, { name: "Airport" });

station.set(27, { name: "Discovery Bay" });
station.set(29, { name: "Ma Wan" });
station.set(30, { name: "Cheung Chau" });

station.set(32, { name: "Pok Fu Lam " });
station.set(34, { name: "Central" });
station.set(35, { name: "Causeway Bay" });

station.set(36, { name: "Airport" });

station.set(37, { name: "Electric Company" });

station.set(38, { name: "Repulse Bay" });
station.set(40, { name: "The Peak" });
